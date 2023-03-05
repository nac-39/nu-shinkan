import os
import time
import json
import requests
import dotenv
from pprint import pprint
from concurrent.futures import ThreadPoolExecutor


dotenv.load_dotenv()

token = os.getenv('TWITTER_BEARER_TOKEN')
list_id = os.getenv('LIST_ID')
img_path = "../public/assets/users/images/"
json_path = "../public/"


def get_club_users(token, cursor="", users=[]):
    cursor_str = f"&cursor={cursor}" if cursor else ""
    res = requests.get(f"https://api.twitter.com/1.1/lists/members.json?list_id={list_id}{cursor_str}&skip_status=true", headers={'authorization': f'Bearer {token}'}
                       )
    res.raise_for_status()
    res = res.json()
    users += res["users"]
    if res["next_cursor_str"] != "0":
        time.sleep(0.1)
        get_club_users(token, res["next_cursor_str"], users)
    return users


def format_user(user):
    return {
        "name": user["name"],
        "description": user["description"] if "description" in user else None,
        "profile_banner_url": user["profile_banner_url"] if "profile_banner_url" in user else None,
        "profile_image_url_https": user["profile_image_url_https"] if "profile_image_url_https" in user else None,
        "screen_name": user["screen_name"],
        "url": user["url"] if "url" in user else None,
    }


def save_json(users):
    with open(json_path + 'users.json', 'w') as f:
        json.dump(users, f, indent=4, ensure_ascii=False)


def save_img(url, name):
    res = requests.get(url)
    with open(f'{img_path}/{name}.jpg', 'wb') as f:
        f.write(res.content)


def convert_camel(snake_dict: dict):
    """
    dictのkeyをスネークケースからキャメルケースに変換する
    """
    # dictのkeyに再帰的にfuncを適用する
    def convert(data, func=lambda x: x):
        if isinstance(data, dict):
            obj = {}
            for key, value in data.items():
                obj[func(key)] = convert(value, func)
            return obj
        elif isinstance(data, list):
            obj = []
            for item in data:
                obj.append(convert(item, func))
            return obj
        else:
            return data

    def to_camelcase(str):
        arr = str.split('_')
        return arr[0] + ''.join(x.title() for x in arr[1:])
    return convert(snake_dict, to_camelcase)


def save_images(user_json):
    for user in user_json:
        try:
            if user["profile_image_url_https"]:
                save_img(user["profile_image_url_https"],
                         user["screen_name"] + "_profile")
            if user["profile_banner_url"]:
                save_img(user["profile_banner_url"],
                         user["screen_name"] + "_banner")
        except Exception as e:
            print(e)
            print(user)


if __name__ == '__main__':
    users = get_club_users(token)
    user_json = []
    for user in users:
        try:
            user_json.append(format_user(user))
        except Exception as e:
            pprint(user)
            pprint(e)
    save_json(convert_camel(user_json))
    pprint(f"saved users: {len(user_json)}")
