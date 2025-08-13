import fs from "fs";

export class FileHandler {
  public static createFile(name: string, data: any): void {
    fs.writeFileSync(`${name}.json`, JSON.stringify(data, null, 2), "utf8");
  }
}