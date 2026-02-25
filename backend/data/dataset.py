import os
import cv2
import numpy as np
from torch.utils.data import Dataset
import torch

# Map original mask values to 0-5
CLASS_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    27: 4,
    39: 5
}

class DesertDataset(Dataset):
    def __init__(self, images_dir, masks_dir=None):
        self.images_dir = images_dir
        self.masks_dir = masks_dir
        self.image_names = os.listdir(images_dir)

    def __len__(self):
        return len(self.image_names)

    def encode_mask(self, mask):
        encoded = np.zeros_like(mask)
        for k, v in CLASS_MAP.items():
            encoded[mask == k] = v
        return encoded

    def __getitem__(self, idx):
        img_name = self.image_names[idx]
        img_path = os.path.join(self.images_dir, img_name)

        image = cv2.imread(img_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (512, 512))
        image = image / 255.0
        image = torch.tensor(image).permute(2, 0, 1).float()

        if self.masks_dir:
            mask_path = os.path.join(self.masks_dir, img_name)
            mask = cv2.imread(mask_path, 0)
            mask = cv2.resize(mask, (512, 512), interpolation=cv2.INTER_NEAREST)
            mask = self.encode_mask(mask)
            mask = torch.tensor(mask).long()
            return image, mask

        return image