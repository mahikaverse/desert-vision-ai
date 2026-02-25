import torch

def calculate_iou(preds, masks, num_classes=10):
    iou_list = []

    preds = torch.argmax(preds, dim=1)

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