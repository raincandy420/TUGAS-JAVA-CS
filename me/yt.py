
# automatically comment hi how are you in random vids
import os
import random
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]

def get_authenticated_service():
    flow = InstalledAppFlow.from_client_secrets_file(
        "client_secret.json", SCOPES)
    credentials = flow.run_console()
    return build("youtube", "v3", credentials=credentials)

def get_random_video_id(youtube):
    # List of random keywords to search
    keywords = ["music", "funny", "news", "game", "cat", "dog", "vlog", "review", "tutorial", "live"]
    keyword = random.choice(keywords)
    search_response = youtube.search().list(
        q=keyword,
        part="id",
        type="video",
        maxResults=25
    ).execute()
    videos = [item["id"]["videoId"] for item in search_response.get("items", [])]
    if not videos:
        return None
    return random.choice(videos)

def comment_on_video(youtube, video_id, text):
    request = youtube.commentThreads().insert(
        part="snippet",
        body={
            "snippet": {
                "videoId": video_id,
                "topLevelComment": {
                    "snippet": {
                        "textOriginal": text
                    }
                }
            }
        }
    )
    response = request.execute()
    print(f"Commented on video: {video_id}")
    return response

def main():
    youtube = get_authenticated_service()
    video_id = get_random_video_id(youtube)
    if video_id:
        comment_on_video(youtube, video_id, "hi how are you")
    else:
        print("No video found.")

if __name__ == "__main__":
    main()