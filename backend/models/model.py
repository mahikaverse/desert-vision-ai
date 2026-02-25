import segmentation_models_pytorch as smp

def get_model():
    model = smp.DeepLabV3Plus(
        encoder_name="resnet50",
        encoder_weights="imagenet",
        classes=6,
        activation=None,
    )
    return model