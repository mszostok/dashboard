import { JSONSchema7 } from "json-schema";

export function parseToJSONSchema7(input: string): {
  error?: Error;
  schema: JSONSchema7;
} {
  try {
    return {
      // schema: JSON.parse(input),
      schema: JSON.parse(`{
      	"type": "object",
      	"title": "Parameters for kubectl executor",
      	"required": [
      		"enabled",
      				"verbs",
      				"resources"
      	],
      	"properties": {
      		"enabled": {
      		  "title": "Set true to enable kubectl commands execution",
      			"type": "boolean",
      			"default": true
      		},
      				"verbs": {
      				"title": "Methods which are allowed",
      					"type": "array",
      					"default": [ "api-resources", "api-versions"],
      					"items": {
      						"type": "string",
      						"enum": [
      							"api-resources",
      							"api-versions",
      							"cluster-info",
      							"describe",
      							"diff",
      							"explain",
      							"get",
      							"logs",
      							"top",
      							"auth"
      						]
      					}
      				},
      				"resources": {
      				"title": "Resource configuration which is allowed",
      					"type": "array",
								"default": [ "deployments","pods"],
      					"items": {
      						"type": "string",
      						"enum": [
      							"deployments",
      							"pods",
      							"namespaces",
      							"daemonsets",
      							"statefulsets",
      							"storageclasses",
      							"nodes"
      						]
      					}
      		}
      	}
      }`),
    };
  } catch (e) {
    const err = e as Error;
    return {
      schema: {} as JSONSchema7,
      error: err,
    };
  }
}

export function errorOrUndefined(
  msgs: (string | Error | undefined)[]
): Error | undefined {
  const errMsgs: string | undefined = msgs.filter((x) => !!x).join(",");
  return errMsgs ? new Error(errMsgs) : undefined;
}
