#include<stdio.h>
void main(){
    int jumlah;
    int reward;
    int reward2;
    int reward3;
 
    reward = 2000000;
    reward2 = 1000000;
    reward3 = 0;

    printf("selamat datang di program bonus \n");
    printf("berapa mobil yang anda jual:");
    scanf("%d", &jumlah);
    if (jumlah == 2) {
        printf("selamat anda mendapat bonus: %d Rp \n", reward2);
    } else if (jumlah >= 3) {
         printf("selamat anda mendapat bonus: %d Rp \n", reward);
    } else if (jumlah <= 1) {
        printf("maaf anda tidak dapat bonus kerja lebih karas lagi!! bonus: %d \n", reward3);
        return 0;
    }
}