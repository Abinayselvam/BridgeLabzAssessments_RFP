package ForLoop;

import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args)
    {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the Number:");
        int num=sc.nextInt();
        int original=num;
        int reverse=0;
        for(;num!=0;num/=10)
        {
            int digit=num%10;
            reverse=reverse*10+digit;
        }
        if(reverse==original)
        {
            System.out.println("This number "+original+" is Palindrome" );
        }
        else {
            System.out.println("This number "+original+" is not Palindrome" );
        }
    }
}