class Person {
  /* #region Vars */
  private fullname: string;
  private image: string;
  /* #endregion */

  constructor(fullname: string, imageURL: string) {
    this.fullname = fullname;
    this.image = imageURL;
  }

  getFullName(): string {
    return this.fullname;
  }
  getImageURL(): string {
    return this.image;
  }
}
