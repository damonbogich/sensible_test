//Part 1: Configuration

let config = {
    "fields": [
      {
        "id": "claims_info_contact_name",
        "type": "name",
        "method": {
          "id": "box",
          "position": "right"
        },
        "anchor": {
          "match": {
            "text": "CS REPRESENTATIVE",
            "type": "startsWith" 
          }
        }
      },
      {
        "id": "claims_info_contact_office_phone",
        "type": "string",
        "method": {
          "id": "box",
          "position": "right"
        },
        "anchor": {
          "match": {
            "text": "OFFICE PHONE",
            "type": "startsWith"
          }
        }
      },
      { 
        //I struggled with this one.  Figured the desired output is "QUOTE".
        "id": "submission_status", 
        "type": "string", 
        "method": {
          "id": "box",//looking in the box "STATUS OF SUBMISSION"
          "position": "right" //Whatever string output found will be to the right of "X" (box checked)
        }, 
        "anchor": {
          "match": [
            {
              "text": "QUOTE", //This is the only box with "QUOTE" included
              "type": "includes"
            },
            {
              "text": "X",// Assuming the boxes are always filled with 'X' the submission status will always be the string to the right of the box marked 'X'
              //Not sure how or if the text "X" is read due to it being in a checkbox
              "type": "equals"
            }
          ]
        }
      },
      {
        "id": "workplace_location_address",
        "type": "address",
        "method": {
          "id": "box",
          "position": "below"
        },
        "anchor": {
          "match": {
            "text": "MAILING ADDRESS",
            "type": "startsWith"
          }
        }
      },
      {
        "id": "applicant_name",
        "type": "name",
        "method": {
          "id": "box",
          "position": "right"
        },
        "anchor": {
          "match": {
            "text": "APPLICANT NAME:", 
            "type": "equals"
          }
        }
      }
    ]
};

//Part 2: Regular Expressions

//VIN problem
// 1999 Toyota Camry 4S4BSAFC7K3369039
// 2019 Toyota 4Runner 1FTYR11X3WPA34928
// 2018 Tesla Roadster JF1GE616588511518

let vinExpression = /\w{17}/g

//EMAIL problem:
let emailExpression = /[a-zA-Z0-9,.-]{5,25}@[a-z0-9]{4,12}.{1}[a-z]{2,4}/g
//Constraints on email:
  //1. prefix before "@" can only contain letters, numbers, ".", ",", or "-" and must be between 5 and 25 characters
  //2. Must contain @
  //3. Followed by email service provider (4-12 character restraint)
  //4. must contain one "." before suffix
  //5. suffix can only be lower case letters and must be between 2 and 4 characters

//PHONE problem:
let phoneExpression = /1?[ ,.,-]?[0-9]{3}[ ,.,-]?[0-9]{3}[ ,.,-]?[0-9]{4}/g
// 908 294 0164
// 908-294-0164
// 908.294.0164
// 9082940164
// 1-908-294-0164
// 1.908.294.0164

