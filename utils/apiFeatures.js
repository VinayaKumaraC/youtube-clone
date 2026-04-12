// handles search, filter, pagination in one place

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        title: {
          $regex: this.queryString.search,
          $options: "i",
        },
      });
    }
    return this;
  }

  filter() {
    if (this.queryString.category && this.queryString.category !== "All") {
      this.query = this.query.find({
        category: this.queryString.category,
      });
    }
    return this;
  }

  pagination() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;