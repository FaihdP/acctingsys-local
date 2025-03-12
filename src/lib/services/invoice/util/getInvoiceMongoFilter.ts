export default function getInvoiceMongoFilter(text: string, defaultFilter: any) {
  const searchText = text.trim().toLowerCase()
  if (!searchText || searchText.trim() === "") return defaultFilter

  const searchWordsArray = searchText.split(" ")

  let possibleNumber = parseFloat(searchText);

  const clientQuery = [{
    $or: [
      { "person.name": { $regex: searchText, $options: "i" }, },
      { "person.lastname": { $regex: searchText, $options: "i" } },
      { 
        $expr: { 
          $regexMatch: { 
            input: { $concat: ["$person.name", " ", "$person.lastname"] },
            regex: text,
            options: "i"
          }
        }
      }
    ]
  }]

  if (searchWordsArray.length > 1) {
    const wordQueries: any[] = [];
    
    searchWordsArray.forEach(word => {
      if (word.length > 1) { // Ignorar palabras muy cortas
        wordQueries.push({ 'person.name': { $regex: word, $options: 'i' } });
        wordQueries.push({ 'person.lastname': { $regex: word, $options: 'i' } });
      }
    });
    
    if (wordQueries.length > 0) {
      clientQuery.push({ $or: wordQueries });
    }
  }

  const query = {
    $or: [
      { date: { $regex: searchText, $options: "i" } },
      { status: { $regex: searchText, $options: "i" } },
      ...(clientQuery.length > 0 ? clientQuery : []),
      ...(possibleNumber ? [{ value: possibleNumber }] : []),
    ],
    $and: [defaultFilter]
  }

  console.log(query)
  return query
}
