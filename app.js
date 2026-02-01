const supabaseUrl = 'https://drreqhnqkchwnvraiako.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycmVxaG5xa2Nod252cmFpYWtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MDg3OTMsImV4cCI6MjA4NTE4NDc5M30.tadIiZw-tWIRzvgdSp2NceXXJQHPypPnoOVD7waRUKM'
const client = supabase.createClient(supabaseUrl, supabaseKey)


function setMessage(msg) {
  document.getElementById('message').innerText = msg || ''
}
function setInfo(text) {
  const info = document.getElementById('info')
  if (!text) { info.textContent = ''; return }
  info.textContent = text
}
async function signUp() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
    const { data: signUpData, error } = await client.auth.signUp({
      email,
      password,
      options: {
        // Ensure this URL is added to "Redirect URLs" in Supabase Auth settings
        emailRedirectTo: 'https://127.0.0.1:5500/index.html'
      }
    })
  try {
  

    if (error) {
      setMessage(error.message)
      return
    }
  } catch (error)
{
    setMessage('Check your email for confirmation!')
    setInfo('A confirmation link has been sent to your email address. Please check your inbox and click the link to verify your account.')
}}
  

async function signIn() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    setMessage(error.message)
    return
  }

  setMessage('Logged in successfully!')
 let newpage=window.location.href.replace("index.html","dashboard.html");
 window.location.href=newpage;
}
async function signOut() {
  const { error } = await client.auth.signOut()
  document.getElementById('message').innerText = error ? error.message : "Logged out!"
  document.getElementById('info').remove()
}
