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

    }
}
