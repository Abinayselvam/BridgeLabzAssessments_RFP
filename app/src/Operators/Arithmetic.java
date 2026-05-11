package Operators;

import java.util.Scanner;

public class Arithmetic {
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a: ");
        int a = sc.nextInt();

        System.out.print("Enter b: ");
        int b = sc.nextInt();

        System.out.print("Enter c: ");
        int c = sc.nextInt();

        // Expressions
        int op1 = a + b * c;
        int op2 = c + a / b;     // ⚠ division
        int op3 = a % b + c;     // ⚠ modulus
        int op4 = a * b + c;     // fixed expression

        // Print results
        System.out.println("a + b * c = " + op1);
        System.out.println("c + a / b = " + op2);
        System.out.println("a % b + c = " + op3);
        System.out.println("a * b + c = " + op4);

        // Find max
        int max = op1;
        if (op2 > max) max = op2;
        if (op3 > max) max = op3;
        if (op4 > max) max = op4;

        // Find min
        int min = op1;
        if (op2 < min) min = op2;
        if (op3 < min) min = op3;
        if (op4 < min) min = op4;

        System.out.println("Maximum value = " + max);
        System.out.println("Minimum value = " + min);

        sc.close();
    }
}