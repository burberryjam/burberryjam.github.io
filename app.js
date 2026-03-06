let contacts = JSON.parse(localStorage.getItem("contacts")) || []

function save() {
 localStorage.setItem("contacts", JSON.stringify(contacts))
 render()
}

function addContact() {

 const name = document.getElementById("name").value
 const notes = document.getElementById("notes").value
 const days = document.getElementById("days").value

 contacts.push({
  name,
  notes,
  followDays: days,
  lastContact: Date.now()
 })

 save()
}

function render() {

 const container = document.getElementById("contacts")
 container.innerHTML = ""

 contacts.forEach((c, i) => {

  const daysSince = Math.floor((Date.now() - c.lastContact) / 86400000)
  const needsFollow = daysSince >= c.followDays

  const el = document.createElement("div")
  el.className = "contact"

  el.innerHTML = `
   <b>${c.name}</b><br>
   ${c.notes}<br>
   Last: ${daysSince} days ago<br>
   ${needsFollow ? "⚠️ Follow up!" : ""}
   <br><br>
   <button onclick="contacted(${i})">Contacted</button>
   <button onclick="removeContact(${i})">Delete</button>
  `

  container.appendChild(el)
 })
}

function contacted(i) {
 contacts[i].lastContact = Date.now()
 save()
}

function removeContact(i) {
 contacts.splice(i,1)
 save()
}

render()
