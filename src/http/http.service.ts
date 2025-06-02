import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GraphQLError } from 'graphql';
import url from 'url';

function logThisPath(urlString: string) {
  // Parse the URL
  const parsedUrl = url.parse(urlString, true);

  // Extract path and query from the parsed URL
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  Logger.debug(`'Path:', ${path}`, "Http Service");
  Logger.debug(`'Query:', ${query}`, "Http Service");
}

@Injectable()
export class HttpService {
  async GetHttpRequest(url: string, path: string): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nGET ${path}`, 'Http Service');
      const response = await axios
        .get(`${url}${path}`)
        .then(res => res)
        .catch(err => err);
      if (response.data) {
        return response.data;
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async PostHttpRequest(url: string, path: string, data: any): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nPOST ${path}`, 'Http Service');

      const response = await axios
        .post(`${url}${path}`, data)
        .then(res => res)
        .catch(err => err);
      if (response.data) {
        return response.data;
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async PutHttpRequest(url: string, path: string, data: any): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nPUT ${path}`, 'Http Service');

      const response = await axios
        .put(`${url}${path}`, data)
        .then(res => res)
        .catch(err => err);
      
      if (response.data) {
        return response.data;
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async DeleteHttpRequest(url: string, path: string): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nDELETE ${path}`, 'Http Service');

      const response = await axios
        .delete(`${url}${path}`)
        .then(res => res)
        .catch(err => err);
      
      if (response.data) {
        return response.data;
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async StreamHttpGetRequest(url: string, path: string, onData: any, onEnd: any): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nPOST/STREAM ${path}`, 'Http Service');

      const response = await axios
        .get(`${url}${path}`, { responseType: 'stream' })
        .then(res => res)
        .catch(err => err)

      if (response.data) {
        const stream = response.data;
        stream.on("data", data => {
          onData(data.toString());
        });

        stream.on("end", () => setTimeout(onEnd, 0));
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async StreamHttpPostRequest(url: string, path: string, data: any, onData: any, onEnd: any): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nPOST/STREAM ${path}`, 'Http Service');

      const response = await axios
        .post(`${url}${path}`, data, { responseType: 'stream' })
        .then(res => res)
        .catch(err => err)

      if (response.data) {
        const stream = response.data;
        stream.on("data", data => {
          onData(data.toString());
        });

        stream.on("end", () => setTimeout(onEnd, 0));
      } else {
        const error = response;
        throw error.response.data;
      }
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }

  async FileHttpPostRequest(url: string, path: string, data: any, res: any): Promise<any> {
    try {
      Logger.log(`\nHOST: ${url} \nPOST/FILE ${path}`, 'Http Service');

      const response = await axios
        .post(`${url}${path}`, data, { responseType: 'stream' })
        .then(res => res)
        .catch(err => err);

      res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
      response.data.pipe(res);
    } catch (error) {
      throw new GraphQLError(error.description, {
        extensions: error
      });
    }
  }
}
