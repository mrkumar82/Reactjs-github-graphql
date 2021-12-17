export const gitQueryFull = {
  query: `
    {
      viewer {
        login
        name
        bio
        company
        avatarUrl
        url
        repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          edges {
            node {
              id
              name
              description
              url
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    }
    `,
};

export const gitQuerySearch = (serachKey, pageCount) => {
  return {
    query: `
  {
    viewer {
      login
      name
      bio
      company
      avatarUrl
      url
    }
    search(query: "${serachKey} user:mrkumar82 sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
      repositoryCount
      nodes {
        ... on Repository {
          name
          description
          url
          id
          viewerSubscription
        }
      }
    }
  }
  
  `,
  };
};
