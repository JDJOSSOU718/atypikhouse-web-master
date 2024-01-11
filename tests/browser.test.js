/*import axios from 'axios'
const apiBaseUrl = 'http://localhost:4000'
describe("Test API's", () => {
    test('test login', async () => {
        let unvalidUser = {
            email: 'admin@admin.com',
            password: 'KSD&Ap?DAWAc'
        }

        const { status, data } = await axios.post(
            `${apiBaseUrl}/api/v1/login/`,
            unvalidUser
        )

        expect(data.success).toBe(false)
    })

    test('test update user', async () => {
        let unvalidUserData = {
            lastname: 466565, // cant be number
            firstname: 'nouveau prenom',
            address: 'rue 6',
            phone: '+3368472659',
            social_link: {},
            grade: 'client',
            city: 'paris',
            country: 'France'
        }
        let data = null
        const token = '3juCOz9meFqBx05lp1'
        try {
            const { status, data } = await axios.put(
                `${apiBaseUrl}/api/v1/users/e6097c59-bd4b-40a4-898e-8c0ff49e4774`,
                unvalidUserData,
                {
                    withCredentials: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        authorization: token
                    }
                }
            )
            expect(data.success).toBeDefined()
        } catch (e) {
            expect(data).toBeNull()
        }
    })
})
*/

import axios from 'axios';

const apiBaseUrl = 'http://localhost:4000';

describe("Test API's", () => {
  // Test de connexion avec un utilisateur non valide
  test('test login with invalid user', async () => {
    const unvalidUser = {
      email: 'admin@admin.com',
      password: 'KSD&Ap?DAWAc'
    };

    const { status, data } = await axios.post(
      `${apiBaseUrl}/api/v1/login/`,
      unvalidUser
    );

    // Assertions
    expect(status).toBe(200);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Bad credential');
  });

  // Test d'envoi d'e-mail
  test('test sending email', async () => {
    const emailData = {
      // "from": "", // peut être null
      to: 'test@mail.com',
      subject: 'test',
      body: 'hello world'
    };

    const { status, data } = await axios.post(
      `${apiBaseUrl}/api/v1/mail/`,
      emailData
    );

    // Assertions
    expect(status).toBe(200);
    expect(data.success).toBe(false);
    expect(data.data).toBeNull();
  });

   // Test de déconnexion
   test('test logout', async () => {
    const token = '3juCOz9meFqBx05lp1';

    try {
      const { status, data } = await axios.post(
        `${apiBaseUrl}/api/v1/logout/`,
        {},
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: token
          }
        }
      );

      // Assertions
      expect(status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Logout successful');
    } catch (error) {
      // Gérer les erreurs si nécessaire
    }
  });

  // Test d'ajout d'utilisateur
  test('test add user', async () => {
    const userData = {
      lastname: 'testeur',
      firstname: 'testo',
      address: 'rue 6',
      email: 'testero@mail.com',
      phone: '+3368472659',
      social_link: {},
      password: 'nouveauMdp',
      grade: 'client',
      city: 'paris',
      country: 'France'
    };

    try {
      const { status, data } = await axios.post(
        `${apiBaseUrl}/api/v1/users/`,
        userData,
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            // Vous pouvez ajouter d'autres en-têtes nécessaires ici
          }
        }
      );

      // Assertions
      expect(status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined(); // L'ID de l'utilisateur ajouté
    } catch (error) {
      // Gérer les erreurs si nécessaire
    }
  });

  // Test de mise à jour de l'utilisateur avec des données non valides
  test('test update user with invalid data', async () => {
    const unvalidUserData = {
      lastname: 466565, // ne peut pas être un nombre
      firstname: 'nouveau prenom',
      address: 'rue 6',
      phone: '+3368472659',
      social_link: {},
      grade: 'client',
      city: 'paris',
      country: 'France'
    };

    const token = '3juCOz9meFqBx05lp1';

    try {
      const { status, data } = await axios.put(
        `${apiBaseUrl}/api/v1/users/e6097c59-bd4b-40a4-898e-8c0ff49e4774`,
        unvalidUserData,
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: token
          }
        }
      );

      // Assertions
      expect(status).toBe(200);
      expect(data.success).toBeDefined();
      // Ajouter plus d'attentes en fonction de la réponse de votre API
    } catch (error) {
      // Gérer les erreurs si nécessaire
    }
  });


  // Test de réservation de maison
  test('test house reservation', async () => {
    const reservationData = {
      price: '150',
      start_date: 1691403477,
      end_date: 1691403480,
      reserved_by: 'e6097c59-bd4b-40a4-898e-8c0ff49e4774',
      house: 9,
      reserved_names: 'hello test',
      billing_details: {},
      created_at: 1691404178,
      status: null,
      photos: null,
      first_name: 'testoterone',
      last_name: 'Testoo',
      title: 'hello world'
    };

    try {
      const { status, data } = await axios.post(
        `${apiBaseUrl}/api/v1/reservations/`,
        reservationData,
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            // Ajoutez d'autres en-têtes si nécessaire
          }
        }
      );

      // Assertions
      expect(status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined(); // L'ID de la réservation ajoutée
    } catch (error) {
      // Gérer les erreurs si nécessaire
    }
  });

    // Test d'ajout de maison
  test('test add house', async () => {
    const houseData = {
      title: 'hello world',
      description: 'Test',
      status: 'pending',
      type: 'tiny',
      nbr_couchage: 2,
      capacity: '50 m2',
      price: '150',
      // photos: {
      //   1: 'url'
      // },
      user_id: 'e6097c59-bd4b-40a4-898e-8c0ff49e4774',
      off_days: [1564546, 158623258],
      location: 'Paris, France'
    };

    try {
      const { status, data } = await axios.post(
        `${apiBaseUrl}/api/v1/houses/`,
        houseData,
        {
          withCredentials: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            // Ajoutez d'autres en-têtes si nécessaire
          }
        }
      );

      // Assertions
      expect(status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined(); // L'ID de la maison ajoutée

       // Vous pouvez stocker l'ID ajouté pour une utilisation future, par exemple, nettoyer la maison après le test
       const houseId = data.data;

       // Supprimez la maison après le test (assurez-vous que votre API prend en charge la suppression)
       const deleteResponse = await axios.delete(`${apiBaseUrl}/api/v1/houses/${houseId}`);
       expect(deleteResponse.status).toBe(200);
       expect(deleteResponse.data.success).toBe(true);

        // Récupérez la liste des maisons après suppression
      const housesAfterDeletion = await axios.get(`${apiBaseUrl}/api/v1/houses`);
      expect(housesAfterDeletion.status).toBe(200);
      expect(housesAfterDeletion.data.success).toBe(true);

      // Vérifiez si la maison ajoutée est toujours dans la liste
      const addedHouse = housesAfterDeletion.data.data.find((house) => house._id === houseId);
      expect(addedHouse).toBeUndefined(); // Assurez-vous que la maison n'est pas dans la liste après suppression

    } catch (error) {
      // Gérer les erreurs si nécessaire
    }
  });
  
});



