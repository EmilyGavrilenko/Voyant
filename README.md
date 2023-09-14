# Voyant
Digital passport to track all the countries you've visited, paired with an interactive map. 

### Contents
1. _backend_:  
   Endpoints to fetch all countries, get/add/update/delete countries for a user, and label an image using Roboflow
2. _frontend_:  
   React frontend for authenticating, adding countries, and labeling with Roboflow
3. _scripts_:  
   Script to fetch all countries from an API and convert to an insert SQL query
4. _upload_images_:  
   Endpoint to upload an image to S3
   
### Tech Stack:
**frontend**: React, MUI, Clerk (auth), Mapbox (map)  
**backend**: Django (DB), Express (Img upload), Roboflow (labeling), S3 (Img store)

### Preview
https://github.com/EmilyGavrilenko/Voyant/assets/49248589/f7167fc3-1b19-4057-bcdc-15d888e71d7e

