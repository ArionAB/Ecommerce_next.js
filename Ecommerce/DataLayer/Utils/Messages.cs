namespace Ecommerce.DataLayer.Utils
{
    public class Message
    {
        public string Text { get; set; }

        public string MessageType { get; set; }
    }

    public static class Messages
    {
        public static Message Message_RegisterUserError = new Message { Text = "Eroare la inregistrare", MessageType = MessageType.Error };
        public static Message Message_RegisterUserSuccess = new Message { Text = "Inregistrat cu success!", MessageType = MessageType.Success };

        public static Message Message_EmailAlreadyUsed = new Message { Text = "Email-ul este deja folosit", MessageType = MessageType.Error };

        public static Message Message_UploadPictureSuccess = new Message { Text = "Imagine uploadata cu success!", MessageType = MessageType.Success };
        public static Message Message_UploadPictureError = new Message { Text = "Imaginea nu a putut fi uploadata!", MessageType = MessageType.Error };

        public static Message Message_GetBabyItemsError = new Message { Text = "Baby Items nu au putut fi fetchuite!", MessageType = MessageType.Error };
        public static Message Message_GetBabyItemsSuccess = new Message { Text = "Baby Items au fost fetchuite!", MessageType = MessageType.Success };

        public static Message Message_GetBabyItemIdError = new Message { Text = "Baby Item id invalid!", MessageType = MessageType.Error };
        public static Message Message_GetBabyItemSuccess = new Message { Text = "Baby Item a fost fetchuit!", MessageType = MessageType.Success };
        public static Message Message_GetBabyItemError = new Message { Text = "Baby Item erroare!", MessageType = MessageType.Error };
        
        public static Message Message_UpdateBabyItemSuccess = new Message { Text = "Baby Item a fost actualizat!", MessageType = MessageType.Success };
        public static Message Message_UpdateBabyItemError = new Message { Text = "Baby Item actualizare eroare!", MessageType = MessageType.Error };

    }
}
