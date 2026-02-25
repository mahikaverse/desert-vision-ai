import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import torch
from torch.utils.data import DataLoader

from data.dataset import DesertDataset
from models.model import get_model

VAL_IMAGES = "data/val/images"
VAL_MASKS = "data/val/masks"

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
BATCH_SIZE = 4
NUM_CLASSES = 6


def calculate_iou(preds, masks, num_classes=10):
    preds = torch.argmax(preds, dim=1)

    iou_list = []

    for cls in range(num_classes):
        pred_cls = (preds == cls)
        mask_cls = (masks == cls)

        intersection = (pred_cls & mask_cls).sum().item()
        union = (pred_cls | mask_cls).sum().item()

        if union == 0:
            continue

        iou = intersection / union
        iou_list.append(iou)

    if len(iou_list) == 0:
        return 0.0

    return sum(iou_list) / len(iou_list)


def test():

    val_dataset = DesertDataset(VAL_IMAGES, VAL_MASKS)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE)

    model = get_model().to(DEVICE)
    model.load_state_dict(torch.load("models/best_model.pth", map_location=DEVICE))
    model.eval()

    total_iou = 0
    batches = 0

    with torch.no_grad():
        for images, masks in val_loader:
            images = images.to(DEVICE)
            masks = masks.to(DEVICE)

            outputs = model(images)

            iou = calculate_iou(outputs, masks, NUM_CLASSES)
            total_iou += iou
            batches += 1

    mean_iou = total_iou / batches
    print(f"\nFinal Mean IoU (Validation Set): {mean_iou:.4f}")


if __name__ == "__main__":
    test()