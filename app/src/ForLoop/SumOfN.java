package ForLoop;

import java.util.Scanner;

public class SumOfN {
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the number for sum:");
        int num= sc.nextInt();
        int sum=0;
        for(int i=num;i>=0;i--)
        {
            sum+=i;
        }
        System.out.println("Sum of" +num+" numbers:"+sum);
    }
}