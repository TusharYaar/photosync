package com.tusharyaar.photosync.mlkit; // replace com.your-app-name with your app’s name
import android.graphics.PointF;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.face.Face;
import com.google.mlkit.vision.face.FaceContour;
import com.google.mlkit.vision.face.FaceDetection;
import com.google.mlkit.vision.face.FaceDetector;
import com.google.mlkit.vision.face.FaceDetectorOptions;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class FaceRecognitionModule extends ReactContextBaseJavaModule {
    FaceRecognitionModule(ReactApplicationContext context) {
        super(context);
    }

    final FaceDetectorOptions highAccuracyOpts =
            new FaceDetectorOptions.Builder()
                    .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_ACCURATE)
                    .setContourMode(FaceDetectorOptions.CONTOUR_MODE_ALL)
                    .build();

    @Override
    public String getName() {
        return "FaceRecognitionModule";
    }

    public void mapBoundingBox(Rect bounds) {
    }

    @ReactMethod
    public void getFaces (String url, Promise promise) {
        InputImage image;
        try {
            Uri uri = Uri.parse(url);
            image = InputImage.fromFilePath(getReactApplicationContext(), uri);

            FaceDetector detector = FaceDetection.getClient(highAccuracyOpts);
            Task<List<Face>> result =
                    detector.process(image)
                            .addOnSuccessListener(
                                    new OnSuccessListener<List<Face>>() {
                                        @Override
                                        public void onSuccess(List<Face> faces) {
                                            WritableMap response = Arguments.createMap();
                                            response.putInt("width",image.getWidth());
                                            response.putInt("height",image.getHeight());
                                            WritableArray facesArr = Arguments.createArray();
                                            response.putInt("facesDetected", faces.size());
                                            if (faces.size() != 0) {
                                                for (Face face : faces) {
                                                    Rect bounds = face.getBoundingBox();
                                                    WritableMap faceMap = Arguments.createMap();
                                                    faceMap.putInt("bottom", bounds.bottom);
                                                    faceMap.putInt("left", bounds.left);
                                                    faceMap.putInt("right", bounds.right);
                                                    faceMap.putInt("top", bounds.top);
                                                    faceMap.putInt("centerX", bounds.centerX());
                                                    faceMap.putInt("centerY", bounds.centerY());
                                                    facesArr.pushMap(faceMap);
                                                }

                                            }
                                            response.putArray("faces", facesArr);
                                            promise.resolve(response);
                                        }
                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            promise.reject("Face Detection Failed", e);
                                        }
                                    });

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public WritableArray mapContours(List<PointF> points) {
        WritableArray arr = Arguments.createArray();
        for (PointF point:points) {
            WritableMap cord = Arguments.createMap();
            cord.putDouble("x", point.x);
            cord.putDouble("y", point.y);
            arr.pushMap(cord);
        }
        return arr;
    }

    @ReactMethod
    public void getContours(String url, Promise promise) {
        InputImage image;
        try {
            Uri uri = Uri.parse(url);
            image = InputImage.fromFilePath(getReactApplicationContext(), uri);

            FaceDetector detector = FaceDetection.getClient(highAccuracyOpts);
            Task<List<Face>> result =
                    detector.process(image)
                            .addOnSuccessListener(
                                    new OnSuccessListener<List<Face>>() {
                                        @Override
                                        public void onSuccess(List<Face> faces) {
                                            WritableMap response = Arguments.createMap();
                                            response.putInt("width",image.getWidth());
                                            response.putInt("height",image.getHeight());
                                            WritableArray facesArr = Arguments.createArray();
                                            response.putInt("facesDetected", faces.size());
                                            int nul = 0;
                                            if (faces.size() != 0) {
                                                FaceContour faceC;
                                            for (int i=0;i<faces.size();i++) {
                                                WritableMap faceMap = Arguments.createMap();
                                                faceC = faces.get(i).getContour(FaceContour.FACE);
                                                if (faceC != null) {
                                                    faceMap.putArray("face", mapContours(faceC.getPoints()));
                                                    facesArr.pushMap(faceMap);
                                                }else {
                                                    nul++;
                                                }
//                                                List<PointF> rightEyeContour = face.getContour(FaceContour.RIGHT_EYE).getPoints();
//                                                faceMap.putArray("rightEye", mapContours(rightEyeContour));
//                                                List<PointF> faceContour = face.getContour(FaceContour.v).getPoints();
//                                                faceMap.putArray("face", mapContours(faceContour));

                                            }
                                                response.putInt("null", nul);
                                                response.putArray("faces", facesArr);
                                            }
                                            promise.resolve(response);
                                        }
                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            promise.reject("Face Detection Failed", e);
                                        }
                                    });

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}