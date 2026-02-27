import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import {Bucket} from "aws-cdk-lib/aws-s3";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const bucket = new Bucket(this, "bootcamp-demo-bucket",{
          bucketName: "swblunatestbucket",
          removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const dynamo = new dynamodb.TableV2(this, "bootcamp-dynamo-demo", {
            partitionKey:  { name: 'SWBLuna-dynamo', type: dynamodb.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
          tableName: "SWBLuna-dynamo",
      })

      const testFunction = new NodejsFunction(this, 'swblunademofunction', {
          entry: 'src/demoFunction.ts',
          functionName: 'swblunademofunctionname',
          handler: 'handler',
          memorySize: 128,
          timeout: cdk.Duration.seconds(5),
          bundling: {
              externalModules: ['@aws-sdk/client-s3']
          },
          environment: {
              BUCKET_NAME: bucket.bucketName
          }

      });

      bucket.grantReadWrite(testFunction);

  }
}
