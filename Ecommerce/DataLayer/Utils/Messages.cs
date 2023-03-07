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

        public static Message Message_GetPaginatedBabyItemsError = new Message { Text = "Eroare filtrare baby items", MessageType = MessageType.Error };

        public static Message Message_AuthenticateUserSuccess = new Message { Text = "User autentificat cu success!", MessageType = MessageType.Success };
        public static Message Message_AuthenticateUserError = new Message { Text = "Eroare autentificare!", MessageType = MessageType.Error };

        public static Message Message_LoggedInError = new Message { Text = "Utilizatorul nu a putut fi logat. Verificați informațiile introduse.", MessageType = MessageType.Error };

        public static Message Message_RefreshedTokenSuccess = new Message { Text = "Token-ul a fost actualizat.", MessageType = MessageType.Success };
        public static Message Message_RefreshedTokenError = new Message { Text = "Token-ul nu a putut fii actualizat.", MessageType = MessageType.Error };

        public static Message Message_RevokeTokenSuccess = new Message { Text = "Token-ul a fost revocat.", MessageType = MessageType.Success };
        public static Message Message_RevokeTokenError = new Message { Text = "Token-ul nu a putut fii revocat.", MessageType = MessageType.Error };
        

        public static Message Message_DeleteProductGeneralError = new Message { Text = "Eroare stergere produs.", MessageType = MessageType.Error };
        public static Message Message_DeleteProductIdError = new Message { Text = "Id-ul produsului inexistent.", MessageType = MessageType.Error };
        public static Message Message_DeleteProductError = new Message { Text = "Produsul nu a fost gasit in baza de date.", MessageType = MessageType.Error };
        public static Message Message_DeleteProductSuccess = new Message { Text = "Produsul a fost sters din baza de date.", MessageType = MessageType.Success };

        public static Message Message_AddItemToCartError = new Message { Text = "Eroare adaugare item to cart!", MessageType = MessageType.Error };
        public static Message Message_AddItemToCartSuccess = new Message { Text = "Item adaugat in cart cu success!", MessageType = MessageType.Success };

        public static Message Message_GetCartItemIdError = new Message { Text = "User id invalid!", MessageType = MessageType.Error };
        public static Message Message_GetCartItemCartError = new Message { Text = "Cart inexistent!", MessageType = MessageType.Error };
        public static Message Message_GetCartItemProductError = new Message { Text = "Produs in cart inexistent!", MessageType = MessageType.Error };
        public static Message Message_GetCartItemsSuccess = new Message { Text = "Cart Items au fost fetchuite!", MessageType = MessageType.Success };
        public static Message Message_GetCartItemError = new Message { Text = "Cart items eroare request!", MessageType = MessageType.Error };
        public static Message Message_ProductIdError = new Message { Text = "Product id invalid", MessageType = MessageType.Error };

        public static Message Message_ChangedItemQtySuccess = new Message { Text = "Cantitatea modificata cu success!", MessageType = MessageType.Success };
        public static Message Message_ChangeItemQtyError = new Message { Text = "Eroare modificare cantitate!", MessageType = MessageType.Error };

        public static Message Message_RemoveCartItemError = new Message { Text = "Eroare sterge item din cart!", MessageType = MessageType.Error };
        public static Message Message_RemoveCartItemSuccess = new Message { Text = "Item sters cu success!", MessageType = MessageType.Success };

        public static Message Message_AddressAddedSuccess = new Message { Text = "Adresa de livrare adaugata!", MessageType = MessageType.Success };
        public static Message Message_AddressAddedError = new Message { Text = "Adresa de livrare nu a putut fi adaugata!", MessageType = MessageType.Error };
        
        public static Message Message_AddOrderSuccess = new Message { Text = "Comandă finalizată", MessageType = MessageType.Success };
        public static Message Message_AddOrderError = new Message { Text = "Comanda nu a putut fi finalizată", MessageType = MessageType.Error };

        public static Message Message_GetOrderSuccess = new Message { Text = "Lista comenzilor primită cu success", MessageType = MessageType.Success };
        public static Message Message_GetOrderError = new Message { Text = "Comenzile nu au putut fi afișate", MessageType = MessageType.Error };

        public static Message Message_UsersLoadError = new Message { Text = "Utilizatorii nu au putut fi încărcati.", MessageType = MessageType.Error };

        public static Message Message_RemoveAllCartItemsSuccess = new Message { Text = "Produsele din coș au fost șterse!", MessageType = MessageType.Success };
        public static Message Message_RemoveAllCartItemsError = new Message { Text = "Produse din coș nu au putut fi șterse!.", MessageType = MessageType.Error };

    }
}
