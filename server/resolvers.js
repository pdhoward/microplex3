
// import neo4j driver
const neo4j =         require('neo4j-driver').v1;

//let driver = neo4j.driver("bolt://54.236.8.156:33471", neo4j.auth.basic("neo4j", "carburetor-requirement-kick"));
let driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "nashv1ll"));
driver.onCompleted = function(){
  console.log("NEO4J Connected")
}
driver.onError = function (error) {
  console.log('Driver instantiation failed', error);
};
const resolveFunctions = {

  Query: {
    movies(_, params) {
      let session = driver.session();
      let query = `MATCH (actor:Person)-[:ACTED_IN]->(movie:Movie)
                    WHERE movie.title STARTS WITH "T"
                    RETURN movie.title AS title, collect(actor.name) AS cast
                    ORDER BY title ASC LIMIT 10;`
      return session.run(query, params)
          //  .then( result => { console.log(JSON.stringify(result))})
        //  .then( result => { return result.records.map(record => { return record.get("cast").properties }) })
        //.then( result => { return result.records.map(record => { console.log(JSON.stringify(record)) }) })
        .then( result => { return result.records.map(record => { return record._fields }) })
    }
  }

  /*
  Query: {
    movies(_, params) {
      let session = driver.session();
      let query = "MATCH (movie:Movie) WHERE movie.title CONTAINS $subString RETURN movie LIMIT $limit;"
      return session.run(query, params)
        .then( result => { return result.records.map(record => { return record.get("movie").properties })})
    },
  },
  Movie: {
    similar(movie) {
      let session = driver.session(),
          params = {movieId: movie.movieId},
          query = `
            MATCH (m:Movie) WHERE m.movieId = $movieId
            MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(movie:Movie)
            WITH movie, COUNT(*) AS score
            RETURN movie ORDER BY score DESC LIMIT 3
          `
      return session.run(query, params)
        .then( result => { return result.records.map(record => { return record.get("movie").properties })})
    },
    genres(movie) {
      let session = driver.session(),
          params = {movieId: movie.movieId},
          query = `
            MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
            WHERE m.movieId = $movieId
            RETURN g.name AS genre;
          `
      return session.run(query, params)
        .then( result => { return result.records.map(record => { return record.get("genre") })})
    }
  },
*/
};

export default resolveFunctions;
