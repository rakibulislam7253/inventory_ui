import Swal from 'sweetalert2';
class toast {
    confirmation_box(response_data) {
        console.log('sweet  :', response_data.data.status_code);
        if (response_data.data.status_code == 1) {
            console.log('Insert Successfully');
            Swal.fire({
                icon: 'success',
                title: 'Successfull Insert',
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
                timer: 2500
            });
        } else if (response_data.data.status_code == 2) {
            Swal.fire({
                icon: 'success',
                title: 'Successfull Update',
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
                timer: 2500
            });
        }
    }
    authorizeTost(response_data) {
        console.log('sweet  :', response_data.data.status_code);
        if (response_data.data.status_code == 1) {
            console.log('Authorization Successfully');
            Swal.fire({
                icon: 'success',
                title: 'Successfull Authorized',
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
                timer: 2500
            });
        } else if (response_data.data.status_code == 2) {
            Swal.fire({
                icon: 'success',
                title: 'Successfull Declined',
                showConfirmButton: false,
                toast: true,
                position: 'top-right',
                timer: 2500
            });
        }
    }
    error_message(message) {
        console.log(message);
        Swal.fire({
            icon: 'error',
            title: 'Error! ',
            toast: true,
            position: 'top-right',
            text: message,
            showConfirmButton: false,
            timer: 5500
        });
    }
}
export default new toast();
