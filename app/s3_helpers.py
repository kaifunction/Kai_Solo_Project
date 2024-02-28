import boto3
import botocore
import os
import uuid
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_UPLOADACCESSKEY"),
   aws_secret_access_key=os.environ.get("S3_UPLOADSECRETACCESSKEY")
)


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "mp3", "mp4", "wav"}


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def pin_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


BUCKET_NAME = os.environ.get("S3_SONGUPLOADBUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


class PinForm(FlaskForm):
    pin = FileField("Pin File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")
