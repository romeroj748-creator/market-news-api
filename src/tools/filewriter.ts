import * as fs from "fs";

export class FileWriter {
  public writeObjectToFile = (object: any, path: string): void => {
    const data = JSON.stringify(object, null, 3);

    fs.writeFile(path, data, "utf8", (error: any) => {
      if (error) {
        console.error("An error occurred while writing JSON Object to File.");
        console.error(error);

        return;
      }

      console.log("Filed saved successfully.");
    });
  };
}
