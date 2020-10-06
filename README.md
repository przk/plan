# plan
A very small browser app thingy, which shows notification of a class starting. 
Helps with managing online classes.

Should not exist, but does.

## Instructions
Download all files, edit `schedule.js` according to your schedule. Open plan.html in your web browser. Done.

The app should send a notification when a class starts, unless you set `Notify` property `false`.

## schedule.js format
Each `[]` array represents a week day. First is Monday. Arrays representing all days from Monday to Sunday must be present.

Each `{}` object inside an array represents a lesson. 

The fields of the lesson are following:

Field | Is required | Type | Desciption |
--- | --- | --- | --- |
Name | true | string | Name of the lesson | 
Start | true | string | Starting hour in 24h format | 
End | true | string | Ending hour in 24h format | 
Notify | true | boolean | Prevents displaying a notification on event's start if set `false` | 
Link | false | string | URL to the class or meeting; clicking on the class opens it if present | 

An example day with one Algorithms lab starting at 11:00 and ending at 13:30 would look as following:
```js
[
  {
    "Name":"Algorithms lab",
    "Start":"11:00",
    "End":"13:30",
    "Notify":true,
    "Link":"http://example.com/algorithms-lab"
  }
]
```
