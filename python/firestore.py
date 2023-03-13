import getUser
from firebase_admin import credentials
from firebase_admin import firestore
import firebase_admin


cred = credentials.Certificate("./credentials/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def create_user(user_id: str, user: dict):
    doc_ref = db.collection(u'club-users').document(user_id)
    doc_ref.set(user, merge=True)


def get_user(user_id: str):
    doc_ref = db.collection(u'club-users').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return None


def get_users():
    docs = db.collection(u'club-users')
    return list(map(lambda x: x.to_dict(), docs.get()))


if (__name__ == "__main__"):
    users = getUser.get_formatted_club_users()
    for index, user in enumerate(users):
        try:
            create_user(user["screenName"], user)
            print(f"created user: {index}, {user['screenName']}")
        except Exception as e:
            print(f"error: {index}, {user['screenName']}")
