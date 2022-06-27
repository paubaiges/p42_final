import librosa, mir_eval, librosa.display
import numpy as np
scores_arrs = {
    "1": [0, 1, 2, 3],
    "2": [0, 1, 1.5, 2, 3],
    "3": [0, 1, 2, 2.5, 3, 3.5],
    "4": [0, 1, 3, 3.5],
    "5": [0, 0.25, 0.5, 0.75, 1, 1.25, 2.5, 2.75, 3, 3.25, 3.5],
    "6": [0, 0.5, 0.75, 1, 1.5, 2, 2.25, 2.5, 3],
    "7": [0, 0.5, 1.5, 2, 2.332, 2.666, 3, 3.25],
    "8": [0, 0.5, 1, 1.75, 2, 2.25, 2.5, 2.75, 3.25, 3.5, 3.75],
    "9": [0, 0.5, 1, 1.25, 1.5, 2, 2.5, 2.75, 3, 3.5],
    "10": [0, 0.25, 0.5, 0.75, 1, 1.25, 2.25, 3.25, 3.5],
    "11": [0, 0.25, 0.75, 1, 1.332, 1.666, 2.5, 2.75, 3, 3.25, 3.75],
    "12": [0, 0.25, 0.5, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.75],
    "13": [0, 0.25, 0.5, 0.75, 1, 1.332, 1.666, 2.5, 3.25, 3.5],
    "14": [0, 0.25, 0.75, 1.25, 1.5, 1.75, 2, 2.75, 3, 3.25, 3.75]
}

def compareAudio(file_path,id_song):
    x, sr = librosa.load(file_path)
    onset_frames = librosa.onset.onset_detect(x, sr=sr, wait=1, pre_avg=1, post_avg=1, pre_max=1, post_max=1)#Detect the Onsets
    onset_times = librosa.frames_to_time(onset_frames)
    F, P, R = mir_eval.onset.f_measure(onset_times, scores_arrs.get(id_song) , window=0.05)
    return (P*10)