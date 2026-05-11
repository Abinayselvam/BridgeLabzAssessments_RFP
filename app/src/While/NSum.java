package While;

import java.util.Scanner;

public class NSum {
    public static  void main(String[] args)
    {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the number for sum:");
        int n= sc.nextInt();
        int sum=0;
        while (n>=0)
        {
            sum+=n;
            n--;
        }
        System.out.println("Sum of N natural numbers: "+sum);
    }
}