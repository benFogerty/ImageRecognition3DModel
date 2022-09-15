# ImageRecognition3DModel

This is a project dedicated to learning about Machine Learning and Neural Networks. It uses a convulutional neural network which takes an image of a hand-written digit and predicts what number was drawn in real time. It uses a React front-end with a 3D 
rendering of the neural network, as well as using python for the back-end and image pre-proccesing. Being tested on over 70,000 images, it now has an accuracy of 95%.  

![Screenshot 2022-09-14 235912](https://user-images.githubusercontent.com/72901647/190310857-0578346e-decb-4319-953b-60fde675994f.png)


# 3D Rendering:
There is a 3D render of the neural network which displays live data and how each layer works. In real-time you can see a 360 degree view of a visualized neural network as 
well as click on the neural networks layers to see how they are processing the data. For example, the first few layers identify key patterns in a digit such as the loop of a 6,
or the curve of a 5, which can be seen by clicking the layer.

![GifToBe](https://user-images.githubusercontent.com/72901647/190312705-46ac35a9-808a-4b07-87fa-ec6e5592feb3.gif)

# How It Works:
## Input:
It begins with the user submitting a drawn image using the "predict" button. This is then converted into Base64, which is a format which can be sent via a custom API to the back-end server.




## Pre-Processing:
The image first has to be normalized. This means it needs to be in a format similar to that given to it when it was "trained". To do this, we need the image to be 28x28 pixels, centered within a 20x20 box, and the digit must be black on a white canvas.

I first made an outline of the digit based on the continuity of the colour of the ink, essentially saying that any pixel adjacent to the ink that is canvas is considered an outline.

![cbimage](https://user-images.githubusercontent.com/72901647/190309234-871877c9-2db5-470f-bec9-48765fd92645.png)

Then, the next step is to create a 20x20 box around the digit with the edges at the sides. This is so we can later center the digit.

![cbimage (3)](https://user-images.githubusercontent.com/72901647/190310178-587d35ab-6d3f-4d75-ad3e-8a1632de34df.png)


Now that we have only the digit, we center it in a 28x28 image and invert the colours so that it is a white digit on a black canvas.

![cbimage (2)](https://user-images.githubusercontent.com/72901647/190310094-20b12752-3085-4303-b10c-18dc818184a5.png)

We then resize it to be a 28x28 image giving us our final image ready to be used.

![cbimage (4)](https://user-images.githubusercontent.com/72901647/190310306-959cc148-991c-4332-b11b-52ba221e786d.png)

The last step is to then convert it into a one dimensional array where each value represents a pixels shade of grey. This is how the neural network actually interprets the image and can then begin doing the magic!



## Predicting:

Using the same array, it is fed into the inout layer of the neural network where it then makes calculated predictions based on previosu weights and biases it has learned in training.


