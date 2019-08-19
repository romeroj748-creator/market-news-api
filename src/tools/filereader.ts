import * as fs from "fs";

export class FileReader {
  public readObjectFromFile = async (path: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      fs.readFile(path, (error, contents) => {
        if (error !== null) {
          console.error(
            "An error occurred while reading JSON Object from file"
          );
          console.error(error);

          return;
        }

        const data = JSON.parse(contents.toString());

        resolve(data);
      });
    });
  };
}
