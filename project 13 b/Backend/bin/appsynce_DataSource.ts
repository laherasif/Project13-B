#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppsyncLambdaBookMarkStack } from '../lib/app_synce_bookmark';

const app = new cdk.App();
new AppsyncLambdaBookMarkStack(app, 'AppsynceBookMarkStack');
