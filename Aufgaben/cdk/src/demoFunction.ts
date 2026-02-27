import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export async function handler(event: {key: string, body: string}){
    const s3 = new S3Client();
    const bucketName = process.env.BUCKET_NAME
    const result = await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: event.key,
        Body: JSON.stringify(event.body)
    }));

    console.log(result);
}



