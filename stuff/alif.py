while True:
    # Input nilai awal
    a = float(input("Masukkan suku pertama (a): "))
    b = float(input("Masukkan beda (b): "))
    n = float(input("Masukkan nilai n untuk menghitung suku ke-n dan jumlah deret ke-n: "))

    # Rumus suku ke-n dan perhitungan
    print("\nLangkah-langkah perhitungan:")
    print(f"Suku ke-n (un) dihitung dengan rumus: un = a + b * (n - 1)")
    print(f"= {a} + {b} * ({n} - 1)")
    un = a + b * (n - 1)
    print(f"= {a} + {b} * {n - 1}")
    print(f"= {a} + {b * (n - 1)}")
    print(f"= {un}")

    # Rumus jumlah deret ke-n dan perhitungan
    print(f"\nJumlah deret ke-n (sn) dihitung dengan rumus: sn = n / 2 * (un + a)")
    print(f"= {n} / 2 * ({un} + {a})")
    sn = n / 2 * (un + a)
    print(f"= {(n / 2)} * {un + a}")
    print(f"= {sn}")

    # Output hasil
    print("\nHasil Akhir:")
    print("Suku ke-n (un):", un)
    print("Jumlah deret ke-n (sn):", sn)

    # Tanya apakah ingin mengulangi
    ulang = input("\nApakah Anda ingin menghitung lagi? (y/n): ")
    if ulang.lower() != 'y':
        print("Program selesai. Terima kasih!")
        break
