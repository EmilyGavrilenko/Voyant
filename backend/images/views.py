import os 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, parser_classes
from roboflow import Roboflow

# env = os.environ.Env()
rf = Roboflow(api_key=os.environ["ROBOFLOW_API_KEY"])
project = rf.workspace().project("flag-detector-2")
model = project.version(3).model

@api_view(['POST'])
def label_image(request):
    print("Made it here")
    print(request.data)
    img_url = request.data['imgURL']

    # Label the image using Roboflow
    roboflow_response = model.predict(img_url, hosted=True, confidence=40, overlap=30).json()

    # Return the labeled image
    return JsonResponse({'message': 'Image labeled successfully', 'data': roboflow_response})
