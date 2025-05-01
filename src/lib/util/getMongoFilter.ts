export default function getMongoFilter(text: string, fields: string[], defaultFilter?: any, fieldsObject?: string[]) {
  const searchText = text.trim().toLowerCase()
  if (!searchText || searchText.trim() === "") return defaultFilter
  const possibleNumber = parseFloat(searchText);

  const query: { $or: any[], $and?: any[] } = {
    $or: [
      ...fields.map(field => ({ [field]: { $regex: searchText, $options: "i" } })),
      ...getMongoObjectFilter(searchText, fieldsObject),
      ...(possibleNumber ? [{ value: possibleNumber }] : []),
    ],
  }

  if (defaultFilter) { query.$and = [defaultFilter] }

  //console.log(query)
  return query
}

function getMongoObjectFilter(searchText: string, fieldsObject?: string[]) {
  const hasFieldsObject = fieldsObject && fieldsObject.length > 0
  const searchWordsArray = searchText.split(" ")

  const fieldsObjectQuery = []
  if (hasFieldsObject) {
    const $or = []
    fieldsObject.forEach(field => {
      $or.push(
        { [field]: { $regex: searchText, $options: "i" } },
      )
    })

    const concatArray = fieldsObject.flatMap((field, index) => {
      const elements = [`$${field}`]
      if (index < fieldsObject.length - 1) {
        elements.push(" ")
      }
      return elements
    })

    if (concatArray.length > 0) {
      $or.push({
        $expr: { 
          $regexMatch: { 
          input: { $concat: concatArray },
          regex: searchText,
            options: "i"
          }
        }
      })
    }

    fieldsObjectQuery.push({ $or })
  }

  if (searchWordsArray.length > 1 && hasFieldsObject) {
    const wordQueries: any[] = [];
    
    searchWordsArray.forEach(word => {
      if (word.length > 1) {
        fieldsObject.forEach(field => {
          wordQueries.push({ [field]: { $regex: word, $options: 'i' } });
        })
      }
    });
    
    if (wordQueries.length > 0) {
      fieldsObjectQuery.push({ $or: wordQueries });
    }
  }

  return fieldsObjectQuery.length > 0 ? fieldsObjectQuery : []
}
