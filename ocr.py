import requests
import cv2
import numpy as np
import io
import json

def chars_counter(path):
    img = cv2.imread(path)
    #OCR - 1MB limit

    #Posting a request to API
    url_api = "https://api.ocr.space/parse/image"
    _, compressedimage = cv2.imencode(".jpg", img, [1, 90])
    file_bytes = io.BytesIO(compressedimage)

    result = requests.post(url_api, files = {path: file_bytes}, data = {"apikey": "31df78a8b388957"})
    #Changing the language -> data = {"apikey": "", "language": ""}


    #Processing the result
    result = result.content.decode()
    result = json.loads(result)
    text_detected = result.get("ParsedResults")[0].get("ParsedText")
    text_detected_no_space = text_detected.replace(" ", "")
    no_chars = len(text_detected_no_space)
    
    data_dict = {"number_of_characters": [no_chars]}
    json_data = json.dumps(data_dict)

    return json_data, text_detected
    



json_data, text_detected = chars_counter("notes image.jpeg") 

print(text_detected)
print(json_data)


#Credits for the tutorial: https://www.youtube.com/watch?v=fswR5cbmq-c