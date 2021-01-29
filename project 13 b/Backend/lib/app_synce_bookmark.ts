import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class AppsyncLambdaBookMarkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    ///APPSYNC API gives you a graphql api with api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),       ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,     ///Defining Authorization Type
          
        },
      },
      xrayEnabled: true                                             ///Enables xray debugging
    })

    ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl
    })

    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

  

    ////Set lambda as a datasource


    const todosLambda = new lambda.Function(this, 'AppSyncBookMarkHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024
    });
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', todosLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getBooks"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addBookMark"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateBookMark"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteBookMark"
    });

 
    const todosTable = new dynamodb.Table(this, 'CDKBookMarkTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(todosLambda)
    todosLambda.addEnvironment('BOOK_MARKS_TABLE', todosTable.tableName);






  

  }
}
