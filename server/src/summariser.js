//TODO: Have meeting then decide on structure of program (ie how this script receives data)
//It is assumed this script is receiving plaintext
//Requires axios
const axios = require("axios")
function summarise(text, limit, token){
    return new Promise((resolve, reject) => {
        //text is plaintext to be summarised, limit is max number of words for the summary
        var prompt = `Summarise the above essay with a summary of ${limit} words or less, with the main idea of each paragraph listed as a heading, with key points listed in bullet form, along with additional details. The format to be followed is as follows:\n
        Main Idea:\n
        (main idea of essay)\n
        \n
        Paragraph 1:\n
        - (main idea of paragraph 1)\n
        - (additional details)\n
        `;
        axios({
            method: 'post',
            url: 'https://api.openai.com/v1/chat/completions',
            data: {
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: `${text} \n\n${prompt}`}],
            },
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
          })
          .then((response) => {
            //console.log(response.data)
            //console.log(response.data.choices[0].message)
            resolve(response.data.choices[0].message)
          })
          .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response);
              
              reject({code: 1, error: error.response})
            } else if (error.request) {
              // No response
              console.log(error.request);
              reject({code: 2, error: error.request})
            } else {
              // Server Side Error
              console.log('Server-side Error', error.message);
              reject({code: 0, error: error.message})
            }
            console.log(error.config);
          });

    })
    


}
module.exports = {
    name: "summarise.js",
    summary: summarise,
}