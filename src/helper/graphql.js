import { gql } from "@apollo/client";

export const GET_STARWARS = gql`
query allPeople($after: String, $first: Int, $before: String, $last: Int) {
  allPeople(after: $after, first: $first, before: $before, last: $last) {
    edges {
      node {
        name
        birthYear
        gender
        homeworld {
          name
        }
        species {
          name
        }
      }
      cursor
    }
    totalCount
  }
}
`;
