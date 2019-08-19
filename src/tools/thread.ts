export class Thread {
  public sleep = async (milliseconds: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(resolve, milliseconds);
    });
  };
}
