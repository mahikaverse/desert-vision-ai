import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from tqdm import tqdm

from data.dataset import DesertDataset
from models.model import get_model

# ==========================
# PATHS
# ==========================
TRAIN_IMAGES = "data/train/images"
TRAIN_MASKS = "data/train/masks"
VAL_IMAGES = "data/val/images"
VAL_MASKS = "data/val/masks"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
BATCH_SIZE = 4
EPOCHS = 3   # Train 2 more epochs (3 already done)
LR = 1e-4


def train():

    # ==========================
    # DATASET
    # ==========================
    train_dataset = DesertDataset(TRAIN_IMAGES, TRAIN_MASKS)
    val_dataset = DesertDataset(VAL_IMAGES, VAL_MASKS)

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        drop_last=True
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        drop_last=True
    )

    # ==========================
    # MODEL
    # ==========================
    model = get_model().to(DEVICE)

    # Resume training if model exists
    if os.path.exists("models/best_model.pth"):
        model.load_state_dict(torch.load("models/best_model.pth", map_location=DEVICE))
        print("Loaded previous best model. Continuing training...")

    # ==========================
    # LOSS & OPTIMIZER
    # ==========================
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=LR)
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=2, gamma=0.5)
    best_val_loss = float("inf")

    # ==========================
    # TRAIN LOOP
    # ==========================
    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch+1}/{EPOCHS}")

        # -------- TRAIN --------
        model.train()
        train_loss = 0

        for images, masks in tqdm(train_loader):
            images = images.to(DEVICE)
            masks = masks.to(DEVICE)

            outputs = model(images)
            loss = criterion(outputs, masks)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            train_loss += loss.item()

        train_loss /= len(train_loader)
        print(f"Train Loss: {train_loss:.4f}")

        # -------- VALIDATION --------
        model.eval()
        val_loss = 0

        with torch.no_grad():
            for images, masks in val_loader:
                images = images.to(DEVICE)
                masks = masks.to(DEVICE)

                outputs = model(images)
                loss = criterion(outputs, masks)

                val_loss += loss.item()

        val_loss /= len(val_loader)
        print(f"Val Loss: {val_loss:.4f}")

        # -------- SAVE BEST MODEL --------
        scheduler.step()
       
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), "models/best_model.pth")
            print("Model Saved!")


if __name__ == "__main__":
    train()