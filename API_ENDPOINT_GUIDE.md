# Guide to Create Package Analysis Endpoint

This document explains how to create the `/package/analyze` endpoint in your FastAPI to use the ML model that detects if a package is intact or damaged.

## Endpoint Structure

The endpoint should:
1. Receive an image via `multipart/form-data` (field `image`)
2. Process the image using the model (`cnn_best_model_mobilenet.h5` or `cnn_best_model_mobilenet_nightvision.h5`)
3. Return the status (Intact/Damaged) and confidence

## FastAPI Code Example

```python
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io

app = FastAPI()

# Configure CORS to allow requests from React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model (adjust path as needed)
MODEL_PATH = r'C:\Users\marco\OneDrive\Documentos\SOLVEX\Smart Package Checker\cnn_best_model_mobilenet.h5'
model = load_model(MODEL_PATH)

# Model expected dimensions
IMG_HEIGHT, IMG_WIDTH = 128, 128

@app.post("/package/analyze")
async def analyze_package(image: UploadFile = File(...)):
    try:
        # Read image
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # Resize and normalize (same as main_camera.py)
        img_resized = cv2.resize(img, (IMG_WIDTH, IMG_HEIGHT))
        img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
        img_normalized = img_rgb / 255.0
        img_input = np.expand_dims(img_normalized, axis=0)
        
        # Prediction
        prob = model.predict(img_input, verbose=0)[0][0]
        class_pred = 1 if prob > 0.5 else 0
        status = "Intact" if class_pred == 0 else "Damaged"
        confidence = float(prob) if class_pred == 1 else float(1 - prob)
        
        return {
            "status": status,
            "confidence": confidence,
            "prob": float(prob)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
```

## Dependencies Installation

Make sure your API has the following dependencies:

```bash
pip install fastapi uvicorn python-multipart opencv-python tensorflow pillow numpy
```

## Run API

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Important Notes

1. **Model Path**: Adjust `MODEL_PATH` to the correct path of your `.h5` model
2. **Night Vision Model**: If you want to use the night vision model, use `cnn_best_model_mobilenet_nightvision.h5` and apply night vision transformation before prediction
3. **CORS**: In production, configure CORS properly to allow only requests from your app
4. **Error Handling**: Add more validations as needed

## Expected Response Format

The React Native app expects a JSON response in the format:

```json
{
  "status": "Intact" or "Damaged",
  "confidence": 0.0 to 1.0,
  "prob": 0.0 to 1.0
}
```

The app automatically converts:
- `status === "Intact"` → `"Intact"`
- `status === "Damaged"` → `"Damaged"`
- `confidence` is multiplied by 100 to display as percentage
