import { Spec, BodyParameter, Parameter, Reference } from "swagger-schema-official";

export const getAllPaths = (spec: Spec) => {
  return Object.keys(spec.paths);
};

export const generateKeyApiInfo = ({ spec, paths }: { spec: Spec; paths: Array<string> }) => {
  const keyApiInfo = paths.reduce((acc: Record<string, any>, cur: string) => {
    acc[cur] = {};
    // 处理post接口
    if (spec.paths[cur].post) {
      const apiDetail = spec.paths[cur].post;
      acc[cur].method = "post";
      acc[cur].desc = apiDetail.summary;
      const bodySpec: any = apiDetail.parameters.find((item: BodyParameter) => item.in === "body");
      acc[cur].body = bodySpec.schema.properties;
      const resSepc: any = apiDetail.responses['200'];
      const resData: any = resSepc.schema.properties.data
      if (resData.type === 'array') {
        acc[cur].res = resData.items.properties
        acc[cur].schemaType = resData.type
      } else if (resData.type === 'object') {
        acc[cur].res = resData.properties
        acc[cur].schemaType = resData.type
      } else if (resData.type === 'string') {
        acc[cur].schemaType = resData.type
      }
      // const resData: any = resSepc.schema.properties.data?.items?.properties
    }
    console.log('acc', acc)
    return acc;
  }, {});
  return keyApiInfo;
};
