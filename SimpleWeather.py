import eel

eel.init("web")

@eel.expose
def poke_html():
    return "Hi, i'm a snake."

if __name__ == "__main__":
    eel.start("index.html", mode="firefox", size=(800, 600))