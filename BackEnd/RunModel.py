import os
from tkinter import constants

import cv2
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from PIL import Image, ImageFilter,  ImageOps, ImageChops
from w3lib.url import parse_data_uri
import io, base64
from binascii import a2b_base64
import urllib.parse
from skimage import exposure
from PIL import Image, ImageOps, ImageChops
from io import BytesIO
import requests
from io import BytesIO





def RunModel(img):

    new_model = tf.keras.models.load_model('BackEnd\handwritten.h5')

    #converting base64 string to image with alpha channel
    img = img[22:]
    imgdata = base64.b64decode(str(img))
    img = Image.open(io.BytesIO(imgdata))
    opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGBA)

    #make mask of where the transparent bits are
    trans_mask = opencv_img[:,:,3] == 0

    #replace areas of transparency with white and not transparent
    opencv_img[trans_mask] = [255, 255, 255, 255]

    #new image without alpha channel...
    new_img = cv2.cvtColor(opencv_img, cv2.COLOR_BGR2GRAY)
    th, threshed = cv2.threshold(new_img, 100, 255, cv2.THRESH_OTSU|cv2.THRESH_BINARY_INV)
    GreyScaledImage = base64.b64encode(cv2.imencode('.png', threshed)[1]).decode()
    


    contours, hierarchy = cv2.findContours(threshed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2:]

    im=cv2.cvtColor(new_img,cv2.COLOR_GRAY2BGR)
    cv2.drawContours(im, contours, -1, (0, 255, 0), 2)
    countourTraceImage = base64.b64encode(cv2.imencode('.png', im)[1]).decode()

    # Find bounding box and extract ROI
    (x, y, w, h) = cv2.boundingRect(contours[0])
    imgCrop = threshed[y:(y+h),x:(x+w)]

    #image for react
    countourBoxImage = base64.b64encode(cv2.imencode('.png', imgCrop)[1]).decode()

    #makes digit centred box
    pil_im = Image.fromarray(imgCrop)
    imgCropped = ImageOps.contain(pil_im, (20,20))

    #makes 28 by 28
    imgCropped = np.array(imgCropped)
    DigitBoxImage = base64.b64encode(cv2.imencode('.png', imgCropped)[1]).decode()
    height, width = imgCropped.shape 
    heightPad = int((28.0 - height) / 2.0)
    widthPad = int((28.0 - width) / 2.0)
    imageResized = cv2.copyMakeBorder(imgCropped, heightPad, heightPad, widthPad, widthPad,cv2.BORDER_CONSTANT, value=[0,0,0])
    imageResized = cv2.resize(imageResized, (28,28), interpolation = cv2.INTER_AREA)


    finalImage = base64.b64encode(cv2.imencode('.png', imageResized)[1]).decode()
    
    img = np.array(imageResized)
    img = np.reshape(img, (1, 28, 28))
    
    img = tf.keras.utils.normalize(img, axis=1)

    prediction = new_model.predict(img)
    return(prediction[0], GreyScaledImage, countourTraceImage, countourBoxImage, DigitBoxImage,finalImage, img.tolist())

            



