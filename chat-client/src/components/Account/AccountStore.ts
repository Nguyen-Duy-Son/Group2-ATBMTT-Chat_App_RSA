import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import {
  getAllFriend,
  getAvatarURL,
  updateUserInfo,
  uploadUserAvatar,
  addFriendRequests
} from 'src/services/UserService';

class AccountStore {
  friendList = [];
  isLoading = true;
  addFriendRequests = [];

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state)
      this.isLoading = state;
  }

  constructor() {
    makeAutoObservable(this);
  }

  getAllFriends = async () => {
    try {
      const { data } = await getAllFriend();
      const { data: requests } = await addFriendRequests();

      this.addFriendRequests = requests;
      this.friendList = data;

      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  }

  updateUserInfo = async (userDTO: any) => {
    try {
      const { data } = await updateUserInfo(userDTO);
      toast.success("Successfully updated");
      console.log("uploaded data: ", data);
    } catch (error) {
      console.error('Error updating user info in AccountStore:', error);
      toast.error("Something went wrong :(");
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  }

  uploadUserAvatar = async (image: any) => {
    try {
      const { data } = await uploadUserAvatar(image);
      console.log("image path: " + data);
      const imageSrc = await this.getAvatarSrc(data);
      return imageSrc;
    } catch (error) {
      console.error('Error updating user info in AccountStore:', error);
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  }

  getAvatarSrc = async (avatarUrl: string) => {
    if (!avatarUrl) return;

    try {
      const response = await getAvatarURL(avatarUrl);

      // Convert the binary data to a base64 string
      const base64Image = btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Set the base64 string as the source for the img element
      return (`data:${response.headers['content-type']};base64,${base64Image}`);
    } catch (error) {
      console.error('Error getting avatar:', error);
      // Handle errors as needed
    }
  };

}

export default AccountStore;