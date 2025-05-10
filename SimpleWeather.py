import eel

eel.init("web")

##To use a return value in the javascript, it needs to be set up as an async function. Be sure to use ()()##
@eel.expose
def poke_html():
    return "Hi, i'm a snake."

if __name__ == "__main__":
    eel.start("index.html", mode="firefox", size=(800, 600))