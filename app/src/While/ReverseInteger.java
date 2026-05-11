package While;

import java.util.Scanner;

public class ReverseInteger {
    public static void main(String[] args)
    {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the digit for reverse:");
        int num=sc.nextInt();
        int reverse=0;
        while(num!=0)
        {
            int digit=num%10; //remove the last digit
            reverse=reverse*10+digit;
            num=num/10;
        }
        System.out.println("Resever Number:"+reverse);
        sc.close();
    }
}